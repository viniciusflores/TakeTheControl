pipeline {
  agent any
  stages {
    stage('Download dependencies - backend') {
      steps {
        sh 'yarn'
      }
    }
    stage('Unit Tests') {
      steps {
        sh 'yarn test'
      }
    }
    stage('Run locally') {
      steps {
        sh 'docker-compose build'
        sh 'docker-compose up -d'
        sh 'yarn dev:server'
      }
    }
    stage('Automated Tests - dependencies') {
      dir('automated_test') {
        sh 'yarn'
      }
    }
    stage('Automated Tests - dependencies') {
      dir('automated_test') {
        sh 'yarn cy:test'
      }
    }
    stage('Build') {
      sh 'yarn build'
    }
    stage('Start'){
      sh 'yarn start'
    }
}
