import Utility from "./components/utility";

export default 
{
    assets: [
        { name: 'earth', type: 'model', path: 'assets/models/earth_2.glb'},
        { name: 'clouds', type: 'model', path: 'assets/models/clouds.glb'},
        { name: 'aboutus', type: 'model', path: 'assets/models/aboutUs_2.glb'},
        { name: 'skybox', type: 'texture', path: 'assets/textures/lowresSkybox.jpg'},
        { name: 'aboutusTexture', type: 'texture', path: Utility.IsMoble() ? 'assets/textures/AboutUs_Moble.png' : 'assets/textures/AboutUs.png' },
        { name: 'font', type: 'font', path: 'assets/fonts/roboto.json'}
    ],
    continents: [
        {
            modelFile: 'aboutus', 
            texture: 'aboutusTexture', 
            headerConfig: { text: 'About Us' }, 
            centerLong: 98 * Utility.deg2Rad,
            centerLait: 45 * Utility.deg2Rad,
            backButtonLong: 78 * Utility.deg2Rad,
            backButtonLati: 49 * Utility.deg2Rad,
            desktopLabelConfigs: [
                { text: "2,000+", long: 98 * Utility.deg2Rad, lati: 42.5 * Utility.deg2Rad },
                { text: "10", long: 110 * Utility.deg2Rad, lati: 42.5 * Utility.deg2Rad },
                { text: "$70,000+", long: 83 * Utility.deg2Rad, lati: 42.5 * Utility.deg2Rad },
            ],
            mobileLabelConfigs: [
                { text: "2,000+", long: 98 * Utility.deg2Rad, lati: 44 * Utility.deg2Rad },
                { text: "10", long: 98 * Utility.deg2Rad, lati: 49 * Utility.deg2Rad },
                { text: "$70,000+", long: 98 * Utility.deg2Rad, lati: 39 * Utility.deg2Rad },
            ]
        }
    ]
};