import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly revokedTokens: string[] = [];
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    try {
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  revokeToken(token: string): void {
    this.revokedTokens.push(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.includes(token);
  }
}
