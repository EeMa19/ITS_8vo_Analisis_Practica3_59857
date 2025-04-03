import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode'; // Importar jwt-decode

interface ProtectedRouteProps {
    children: ReactNode;
}

// Extender JwtPayload para incluir el campo 'exp'
interface CustomJwtPayload extends JwtPayload {
    exp: number;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir a /signin
    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    try {
        // Decodificar el token
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos

        // Verificar si el token ha expirado
        if (decoded.exp < currentTime) {
            localStorage.removeItem('token'); // Eliminar el token expirado
            return <Navigate to="/signin" replace />;
        }

        // Si el token es válido, permitir el acceso
        return <>{children}</>;
    } catch (error) {
        // Si hay un error al decodificar el token, asumimos que es inválido
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        return <Navigate to="/signin" replace />;
    }
}