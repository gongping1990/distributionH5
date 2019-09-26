export let baseUrl =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'http://huoke.test.k12.vip/distribution'
    : 'http://huoke.prod.k12.vip/distribution';
