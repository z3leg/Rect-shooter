//PLAYER
    //PLAYER MOVEMENT
    playerMvmSpeed = 0.40;
    playerMvmSpeedLimit = 4;
    playerRotateSpeed = 0.05;

    playerControlls = {shooting: "mouse", rotating: "mouse"};

    //PLAYER WEAPONS
    playerWeaponType1 = {name: "pistol", klass: 'rectangle', shootingSpeed: 40, damage: 5, projectilePiercingForce: 100, projectileVelocity: 20, projectileAmount: 3,
                        projectileTravelDist: 1100, accuracy: 100, rapidFire: true, projectileHeight: 15, projectileWidth: 10, projectileColor: [255, 209, 0], outline: false};


    playerWeaponType2 = {name: "ray of doom", klass: 'rectangle', shootingSpeed: 60, damage: 10, projectilePiercingForce: 100, projectileVelocity: 60, projectileAmount: 1,
                        projectileTravelDist: 2000, accuracy: 100, rapidFire: true, projectileHeight: 70, projectileWidth: 10, projectileColor: [0, 161, 255], outline: false};


    playerWeaponsArr = [playerWeaponType1, playerWeaponType2];
    playerCurrWeapon = 0;

    //PLAYER OTHER
    playerHealth = 100;





//ENEMY

    //TYPE 1 - normal
    enemyType1 = {mvmSpeed: 0.4, mvmSpeedLimit: 2.1, damage: 2, hitSpeed: 1.5, health: 2, armor: 1, side: 20, color: [255,0,0,255], outline: true}
    
    //TYPE 2 - tank
    enemyType2 = {mvmSpeed: 0.18, mvmSpeedLimit: 2, damage: 3, hitSpeed: 2, health: 10, armor: 5, side: 50, color: [0,0,255,255], outline: true}

    //TYPE 3 - quick
    enemyType3 = {mvmSpeed: 1, mvmSpeedLimit: 3.1, damage: 4, hitSpeed: 2.5, health: 1, armor: 0, side: 10, color: [0,255,0,255], outline: true}
    
    //TYPE 4 - stealth
    enemyType4 = {mvmSpeed: 1, mvmSpeedLimit: 3.1, damage: 4, hitSpeed: 2.5, health: 1, armor: 0, side: 20, color: [100,100,100,55], outline: false}
    
    enemiesArr = [enemyType1, enemyType2, enemyType3, enemyType4];


//GLOBAL
    maxRender = 150;