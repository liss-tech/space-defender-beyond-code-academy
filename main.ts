namespace SpriteKind {
    export const Asteroid = SpriteKind.create()
    export const Laser = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSprite(assets.image`laser`, mySprite, 0, -150)
    laser.setKind(SpriteKind.Laser)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
    if (("life" as any) == ("0" as any)) {
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Laser, SpriteKind.Asteroid, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(10)
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.UntilDone)
})
let asteroid: Sprite = null
let laser: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(15)
info.setLife(3)
info.setScore(0)
mySprite = sprites.create(assets.image`spaceship`, SpriteKind.Player)
mySprite.setKind(SpriteKind.Player)
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 150, 150)
game.onUpdateInterval(1000, function () {
    asteroid = sprites.createProjectileFromSide(assets.image`asteroid`, randint(-80, 80), randint(-80, 80))
    asteroid.setKind(SpriteKind.Asteroid)
})
