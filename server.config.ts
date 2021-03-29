import pontConfig from './pont-config.json';

export default function () {
  const result: Record<string, string> = {};
  pontConfig.origins.forEach(origin => {
    const { name, originUrl } = origin;
    result[name] = originUrl.replace(/\/v[0-9]{1,}\/api-docs/, '');
  });
  return result;
}
