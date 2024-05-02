module.exports = {
  apps : [{
    name: 'client',
    script: 'npm',
    args: 'run dev',
    watch: './client',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    cwd: './client'
  }, {
    name: 'server',
    script: 'npm',
    args: 'run start:dev',
    watch: './server',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    cwd: './server'
  }]
};