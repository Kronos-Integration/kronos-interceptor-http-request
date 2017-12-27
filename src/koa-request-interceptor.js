import { Interceptor } from 'kronos-interceptor';

/**
 * Simply forwards the koa req as payload
 */
export class KoaRequestInterceptor extends Interceptor {
  /**
   * @return {string} 'koa-request'
   */
  static get name() {
    return 'koa-request';
  }

  async receive(ctx, args) {
    const response = await this.connected.receive(
      {
        payload: ctx.req
      },
      ctx
    );

    ctx.body = response;
  }
}
