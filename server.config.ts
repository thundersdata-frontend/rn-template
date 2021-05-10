import pontConfig from './pont-config.json';

// eslint-disable-next-line import/no-default-export
export default function () {
  const result: Record<string, string> = {};
  pontConfig.origins.forEach(origin => {
    const { name, originUrl } = origin;
    result[name] = originUrl.replace(/\/v[0-9]{1,}\/api-docs/, '');
  });
  return result;
}
