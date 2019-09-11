export let baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://huoke.test.k12.vip/distribution'
    : 'http://huoke.prod.k12.vip/distribution';
