pipeline{
    agent any
    environment{
        DOCKERHUB_CREDENTIALS=credentials('Dockerhub')
    }
    
    stages{
        stage("Docker Login"){
            steps {

                sh """
                "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                """
            }
            
        }
        stage("Build & Push DockerFile"){
            steps {
              // Run mutliple commands
              sh """
              ansible-playbook playbook-ansible.yml
              """
            }
        }
            
                
            
        
    }
}


