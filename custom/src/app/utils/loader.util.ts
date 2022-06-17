export class LoaderUtil {
  static loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (LoaderUtil.isScriptLoaded(src)) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        resolve();
        script.onload = null;
        script.onerror = null;
      }

      script.onerror = () => {
        reject();
        script.onload = null;
        script.onerror = null;
      }

      document.head.appendChild(script);
    });
  }

  static isScriptLoaded(src: string): boolean {
    return !!document.querySelector(`script[src="${src}"]`);
  }
}
