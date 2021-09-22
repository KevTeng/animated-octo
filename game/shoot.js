var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function between_two(x,y)
{
    if (y-1 < x && x < y+1) {
        return true
      }
}

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}



function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            player2.bullets.splice(i, 1);
            i--;
        }

        if (between_two(player1.bullets[i].position.x, player2.graphic.position.x) || 
            between_two(player1.bullets[i].position.y, player2.graphic.position.y))
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            player2.bullets.splice(i, 1);
            i--;
            scene.remove(player2.graphic);
        }
    }
}


function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if (x < 0 )
        player1.graphic.position.x -= x;
        player2.graphic.position.x -= x;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;
    if (between_two(player1.graphic.position.x, player2.graphic.position.x) &&
        between_two(player1.graphic.position.y, player2.graphic.position.y))
        {
            player1.life -=1;
            player1.dead();
        }


}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;
    

    for (var i = 0; i < length; i++) {
        element = noGround[i];
        if (element != null)
        {
            var tileX = (element[0]) | 0;
            var tileY = (element[1]) | 0;
            var mtileX = (element[0] + sizeOfTileX) | 0;
            var mtileY = (element[1] + sizeOfTileY) | 0;
        }
        else
        {
            var tileX = 0 | 0;
            var tileY = 0 | 0;
            var mtileX = (0 + sizeOfTileX) | 0;
            var mtileY = (0 + sizeOfTileY) | 0;
        }
            

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
        //    player1.dead();
            player1.life -=1;
            player1.dead();
            


        }
    }

}
