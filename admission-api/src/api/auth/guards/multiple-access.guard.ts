import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

@Injectable()
export class MultipleAccessGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate (context: ExecutionContext) {
    const accessGuards = this.reflector.get('multipleAccesses', context.getHandler());
    const guards = this.getGuards(accessGuards);

    return this.checkGuards(context, guards);
  }

  getGuards (guards: any) {
    return guards.map((g) => typeof g === 'function' ? this.moduleRef.get(g, { strict: false }) : this.getGuards(g));
  }

  async checkGuards (context: ExecutionContext, guards: any[]) {
    let status = false;
    for (const guard of guards) {
      try {
        status = Array.isArray(guard) ? await this.checkGuards(context, guard) : status || await guard.canActivate(context);
      } catch (e) {
        status = false;
      }
    }
    return status;
  }
}
