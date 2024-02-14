import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { Request } from 'express';

@Injectable()
export class CredentialsGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        console.log("token", token)

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            request['user'] = payload;
        } catch (error) {
            console.log("error", error)
            throw new UnauthorizedException('Invalid tokens');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        console.log("request.headers.authorization", request.headers.authorization)
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}