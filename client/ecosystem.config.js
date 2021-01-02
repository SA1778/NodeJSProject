module.exports = {
  apps : [{
    name   : 'client',
    script : 'npm',
    args   : 'run start:production',
    env_production : {NODE_ENV: 'production'}
  }],

  deploy : {
    production : {
      user : 'root',
      host : 'http://localhost:3000',
      ref  : 'origin/master',
      repo : 'https://github.com/SA1778/NodeJSProject.git',
      path : './build',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
