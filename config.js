//PLAYER
    //PLAYER MOVEMENT
    playerMvmSpeed = 0.65;
    playerMvmSpeedLimit = 3;
    playerRotateSpeed = 0.5;

    //PLAYER SHOOTING
    playerShootingSpeed = 1;
    playerDamage = 2;
    playerProjectilePiercingForce = 2;
    playerProjectileSize = 10;
    playerProjectileColor = [255, 209, 0];

        //SHOOTING MOVEMENT
        playerProjectileVelocity = 20;
        playerProjectileTravelDist = 1000;

    //PLAYER OTHER
    playerHealth = 100;


//ENEMY

    //TYPE 1 - normal
    enemyType1 = {mvmSpeed: 0.4, mvmSpeedLimit: 2.1, damage: 2, hitSpeed: 1.5, health: 2, side: 20, color: [255,0,0]}
    
    //TYPE 2 - tank
    enemyType2 = {mvmSpeed: 0.2, mvmSpeedLimit: 1.3, damage: 3, hitSpeed: 2, health: 5, side: 30, color: [0,0,255]}

    //TYPE 3 - quick
    enemyType3 = {mvmSpeed: 1, mvmSpeedLimit: 3.1, damage: 4, hitSpeed: 2.5, health: 1, side: 10, color: [0,255,0]}
    
    
    enemiesArr = [enemyType1, enemyType2, enemyType3]


//GLOBAL
    maxRender = 150;