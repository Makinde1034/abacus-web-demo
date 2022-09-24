export const trackEvent = (event: string, properties?: {[key: string]: any}) => {
  global?.analytics?.track?.(event, properties);
};