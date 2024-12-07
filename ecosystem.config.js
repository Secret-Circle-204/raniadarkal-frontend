module.exports = {
  apps: [
    {
      name: 'raniadarkal-frontend',
      script: 'npm',
      args: 'start',
      instances: 2,
      cwd: '/var/www/raniadarkal-frontend',
      exec_mode: 'cluster',
      max_restarts: 5,
      max_memory_restart: '2G',
      autorestart: true,
      watch: true
    }
  ]
  // env_local: {
  //   APP_ENV: 'local' // APP_ENV=local
  // },
  // env_dev: {
  //   APP_ENV: 'dev' // APP_ENV=dev
  // },
  // env_prod: {
  //   APP_ENV: 'prod' // APP_ENV=prod
  // }
}
