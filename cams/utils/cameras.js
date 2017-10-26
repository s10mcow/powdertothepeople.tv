import utils from './utils';
import {beaches} from '../beaches.json';
import Hls from 'hls.js';
const cameras = {};

cameras.setUp = function () {
    if (Hls.isSupported() && !utils.isMobile()) {
        beaches.forEach(beach => {
            const beachName = document.getElementById(beach);

            if (beachName) {
                const beachHls = new Hls();
                beachHls.loadSource(`https://video-auth1.iol.pt/beachcam/${beach}/playlist.m3u8`);
                beachHls.attachMedia(beachName);
                beachHls.on(Hls.Events.MANIFEST_PARSED, () => beachName.play());
            }
        });
    } else {
        beaches.forEach(beach => {
            const beachName = document.getElementById(beach);
            beachName.src = `https://video-auth1.iol.pt/beachcam/${beach}/playlist.m3u8`;
        });
    }
};

module.exports = cameras;
