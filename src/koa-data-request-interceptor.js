import { Interceptor } from 'kronos-interceptor';
import { mergeAttributes, createAttributes } from 'model-attributes';
import { createContext } from 'expression-expander';

/**
 * Forms a data request (no stream) from a koa ctx
 */
export class KoaDataRequestInterceptor extends Interceptor {
  static get configurationAttributes() {
    return mergeAttributes(
      createAttributes({
        data: {
          description: 'additional request data',
          attributes: {}
        }
      }),
      Interceptor.configurationAttributes
    );
  }

  /**
   * @return {string} 'koa-data-request'
   */

  static get name() {
    return 'koa-data-request';
  }

  constructor(config, endpoint) {
    super(config, endpoint);

    Object.defineProperty(this, 'ec', {
      value: createContext()
    });
  }

  async receive(ctx, args) {
    this.ec.properties = args;

    const response = await this.connected.receive(
      this.ec.expand(this.data),
      ctx
    );

    ctx.body = response;
  }
}
