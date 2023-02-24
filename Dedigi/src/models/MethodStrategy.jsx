class MethodController {
  constructor() {
    this.methodStrategy = null;
  }

  set strategy(strategyParam) {
    this.methodStrategy = strategyParam;
  }

  get strategy() {
    return this.methodStrategy;
  }

  execMethod(args) {
    if (!this.methodStrategy.execMethod) {
      throw Object.assign(new Error('execCommand is not implemented'), { code: 404 });
    }
    return this.methodStrategy.execMethod(args);
  }
}

export default MethodController;
