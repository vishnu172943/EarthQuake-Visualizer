pipeline {
    agent any 

    stages {
        stage('Build') { 
            steps {
                 
                 sh 'npm install'     // for a Node.js project
            }
        }

        stage('Test') {
            steps {
                  
                
                 sh 'npm test'
            }
        }
    }
}