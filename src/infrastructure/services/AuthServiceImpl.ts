import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";

export class AuthServiceImpl implements AuthService {
    async login(email: string, password: string): Promise<User | null> {
        try {
            const response = await fetch('http://localhost:8090/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();
            const userData = data.data;
            const token = data.token;

            return {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                token,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async logout(): Promise<void> {
        throw new Error("Método no implementado.");
    }
}