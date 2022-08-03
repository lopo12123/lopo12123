import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshNormalMaterial,
    RingGeometry,
    SphereGeometry,
    TextureLoader
} from "three";

const enum Ruler {
    kkm = 1_000,
    au = 150_000_000
}

const SunConfig = {
    radius: 700 * Ruler.kkm,
    orbitRadius: 0,
    rotation: 25,
    revolution: 1,
}

const PlanetList = [
    'Mercury', 'Venus', 'Earth',
    'Mars', 'Jupiter', 'Saturn',
    'Uranus', 'Neptune'
] as const
const PlanetConfigs: {
    [k in typeof PlanetList[number]]: {
        // km
        radius: number,
        // km
        orbitRadius: number
        // day
        rotation: number
        // day
        revolution: number
    }
} = {
    Mercury: {
        radius: 2.4 * Ruler.kkm,
        orbitRadius: 0.4 * Ruler.au,
        rotation: 59,
        revolution: 88,
    },
    Venus: {
        radius: 6 * Ruler.kkm,
        orbitRadius: 0.7 * Ruler.au,
        rotation: 243,
        revolution: 225,
    },
    Earth: {
        radius: 6.4 * Ruler.kkm,
        orbitRadius: 1 * Ruler.au,
        rotation: 1,
        revolution: 365,
    },
    Mars: {
        radius: 3.4 * Ruler.kkm,
        orbitRadius: 1.5 * Ruler.au,
        rotation: 1,
        revolution: 687,
    },
    Jupiter: {
        radius: 71.5 * Ruler.kkm,
        orbitRadius: 5 * Ruler.au,
        rotation: 0.4,
        revolution: 4333,
    },
    Saturn: {
        radius: 60 * Ruler.kkm,
        orbitRadius: 10 * Ruler.au,
        rotation: 0.4,
        revolution: 10760,
    },
    Uranus: {
        radius: 25.5 * Ruler.kkm,
        orbitRadius: 20 * Ruler.au,
        rotation: 0.7,
        revolution: 30799,
    },
    Neptune: {
        radius: 24.7 * Ruler.kkm,
        orbitRadius: 30 * Ruler.au,
        rotation: 0.7,
        revolution: 60192,
    },
}

const RenderSize: { [k in typeof PlanetList[number]]: [ radius: number, orbitRadius: number ] } = {
    Mercury: [ 1, 28 ],
    Venus: [ 2, 40 ],
    Earth: [ 2.5, 48 ],
    Mars: [ 2, 80 ],
    Jupiter: [ 5, 120 ],
    Saturn: [ 4, 160 ],
    Uranus: [ 2.5, 200 ],
    Neptune: [ 2.5, 220 ],
}

const createSun = () => {
    const _material = new MeshLambertMaterial()
    const sun = new Mesh(new SphereGeometry(20), _material)
    sun.name = 'sun'

    const loader = new TextureLoader()
    loader.load(
        `./solar/sun.jpg`,
        (texture) => {
            _material.map = texture
            _material.needsUpdate = true
        },
        undefined,
        (err) => {
            console.log(err)
        }
    )

    return sun
}
const createPlanet = () => {
    return PlanetList.map(planetName => {
        const _material = new MeshLambertMaterial()
        const _planet = new Mesh(new SphereGeometry(RenderSize[planetName][0]), _material)
        _planet.name = planetName

        const loader = new TextureLoader()
        loader.load(
            `./solar/${ planetName }.png`,
            (texture) => {
                _material.map = texture
                _material.needsUpdate = true
            },
            undefined,
            (err) => {
                console.log(err)
            }
        )

        _planet.position.set(RenderSize[planetName][1], 0, 0)
        return _planet
    })
}
const createTrack = () => {
    return PlanetList.map(planetName => {
        const radius = RenderSize[planetName][0]
        const orbitRadius = RenderSize[planetName][1]

        const _track = new Mesh(
            new RingGeometry(orbitRadius, orbitRadius + 0.1, 50),
            new MeshBasicMaterial({
                color: 0xffffff,
                side: DoubleSide
            })
        )
        _track.name = `track-${ planetName }`
        return _track
    })
}

export {
    PlanetList,
    PlanetConfigs,
    createSun,
    createPlanet,
    createTrack,
}
