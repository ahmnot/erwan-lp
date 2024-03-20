// @ts-nocheck
// src/lib/mediaList.js
let detailsImagePath = '/affiches-court-metrages/';
let squareImagePath = '/affiches-court-metrages/square-version/';

export const mediaList = [
    {
        id: 'fantasy',
        imageCarre: squareImagePath + 'fantasy-carre.jpg',
        images: [detailsImagePath + 'fantasy.webp'],
        title: 'Fantasy',
        author: 'Erwan Le Pape',
        work: 'Original music',
        youtube: 'videoseries?list=PLnSR0k45boRO_gLmRJklVPcyDbfaOy4bg',
        soundcloud: 'https://soundcloud.com/erwanlepape/sets/fantasy-1',
        soundcloudAPINumber: 'playlists/1772144829',
        descriptiveText: "This collection of compositions, inspired by Skyrim's original soundtrack, captures the essence of what could be the musical landscape of a fantastical realm."
    },
    {
        id: 'elegie-quatuor',
        imageCarre: squareImagePath + 'elegie-quatuor-carre.jpg',
        images: [detailsImagePath + 'elegie-quatuor.jpg'],
        title: 'Élégie pour quatuor à cordes',
        author: 'Erwan le Pape',
        work: 'Original Music',
        youtube: 'videoseries?list=PLnSR0k45boRM79S-MtMypxco_QZ7JdPW-',
        soundcloud: 'https://soundcloud.com/erwanlepape/sets/elegie-pour-quatuor-a-cordes',
        soundcloudAPINumber: 'playlists/1777302918',
        descriptiveText:"This composition, inspired by Bartholomé's sculpture 'Monument aux Morts,' was performed by the Anthemis Quartet at the Museum of Fine Arts in Lyon. It portrays death not merely as a tragedy but rather as a liberating force."
    },
    {
        id: 'sahara',
        imageCarre: squareImagePath + 'sahara-carre.webp',
        images: [detailsImagePath + 'sahara.png'],
        title: 'SAHARA',
        author: 'A movie by MOPA',
        work: 'Rescoring',
        youtube: 'iI65zBAHOpg',
        soundcloud: 'https://soundcloud.com/erwanlepape/sets/sahara',
        soundcloudAPINumber: 'playlists/1763727072'
    },
    {
        id: 'nature-morte',
        imageCarre: squareImagePath + 'nature-morte-carre.jpg',
        images: [detailsImagePath + 'nature-morte.webp'],
        title: 'nature morte',
        author: 'A movie by Alysée Lavallée-Imhof',
        work: 'UQAM contest',
        youtube: 'aA2WnaCvRvw',
        soundcloud: 'https://soundcloud.com/erwanlepape/nature-morte',
        soundcloudAPINumber: 'tracks/1671138273'
    },
    {
        id: 'time-trap',
        imageCarre: squareImagePath + 'time-trap-carre.jpg',
        images: [detailsImagePath + 'time-trap.webp'],
        title: 'Time Trap',
        author: 'A movie by Michael Shanks',
        work: 'IFMC contest',
        youtube: '5Z-sKX2BtoA',
        soundcloud: 'https://soundcloud.com/erwanlepape/ifmc-time-trap',
        soundcloudAPINumber: 'tracks/1671134031'
    },
    {
        id: 'toy-tinkers',
        imageCarre: squareImagePath + 'toy-tinkers-carre.jpg',
        images: [detailsImagePath + 'toy-tinkers.webp'],
        title: 'Toy Tinkers',
        author: 'Erwan le Pape',
        work: 'Rescoring',
        youtube: 'ayva2UZY9bo',
        soundcloud: '',
        soundcloudAPINumber: ''
    },
    {
        id: 'resistencia',
        imageCarre: squareImagePath + 'resistencia-carre.jpg',
        images: [detailsImagePath + 'resistencia.webp'],
        title: 'Resistencia',
        author: 'A movie by F. Carolliny Sena and B. Soares Pereira',
        work: 'Original scoring',
        youtube: '0KWvxGljza8',
        soundcloud: 'https://soundcloud.com/erwanlepape/sets/resistencia',
        soundcloudAPINumber: 'playlists/1762686030'
    },
    {
        id: 'le-bouquet',
        imageCarre: squareImagePath + 'le-bouquet-carre.webp',
        images: [detailsImagePath + 'le-bouquet.png'],
        title: 'Le bouquet',
        author: 'A movie by Anaïs Dusautois',
        work: 'Rescoring',
        youtube: 'vMpwETdpQgs',
        soundcloud: 'https://soundcloud.com/erwanlepape/le-bouquet',
        soundcloudAPINumber: 'tracks/1671137550'
    },
    {
        id: 'erinyes',
        imageCarre: squareImagePath + 'erinyes-carre.jpg',
        images: [detailsImagePath + 'erinyes.webp'],
        title: 'ERINYES',
        author: 'A videogame by Gamagora',
        work: 'Original Scoring, Sound Design',
        youtube: '',
        soundcloud: '',
        soundcloudAPINumber: '',
        descriptiveText: "Work in progress."
    },
    {
        id: 'glory-to-dallas',
        imageCarre: squareImagePath + 'glory-to-dallas-carre.jpg',
        images: [detailsImagePath + 'glory-to-dallas.webp'],
        title: 'Glory To Dallas',
        author: 'A videogame by Brassart',
        work: 'Original Scoring, Sound Design',
        youtube: '',
        soundcloud: '',
        soundcloudAPINumber: '',
        descriptiveText: "Work in progress."
    },
    {
        id: 'bistro-belzebuth',
        imageCarre: squareImagePath + 'bistro-belzebuth-carre.webp',
        images: [detailsImagePath + 'bistro-belzebuth.webp'],
        title: 'Le Bistro de Belzebuth',
        author: 'An animation by Le Vieux Montréal',
        work: 'Original Scoring',
        youtube: '',
        soundcloud: '',
        soundcloudAPINumber: '',
        descriptiveText: "Work in progress."
    }
];