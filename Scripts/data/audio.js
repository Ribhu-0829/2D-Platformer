const audio = {
    Map : new Howl({
        src:'./AudioData/map.wav',
        html5:true,
        volume: 0.1
    }),
    initBattle: new Howl({
        src:'./AudioData/initBattle.wav',
        html5:true,
        volume:0.005
    }),
    Battle : new Howl({
        src:'./AudioData/battle.mp3',
        html5:true,
        volume: 0.05
    }),
    fireballHit : new Howl({
        src:'./AudioData/fireballHit.wav',
        html5:true,
        volume: 0.01
    }),
    initFireball : new Howl({
        src:'./AudioData/initFireball.wav',
        html5:true,
        volume: 0.1,
    }),
    Victory : new Howl({
        src:'./AudioData/victory.wav',
        html5:true,
        volume: 0.1
    }),
    TackleHit : new Howl({
        src:'./AudioData/tackleHit.wav',
        html5:true,
        volume: 0.1
    })
}