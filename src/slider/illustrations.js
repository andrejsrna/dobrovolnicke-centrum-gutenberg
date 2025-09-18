import advokacia from './images/advokacia.png';
import databazaPrepojenie from './images/databaza prepojenie.png';
import dobrostretko from './images/dobrostretko.png';
import dobroRanajky from './images/dobroranajky.png';
import firemne from './images/firemne.png';
import kampane from './images/kampane.png';
import konzultacie from './images/konzultacie.png';
import mladez from './images/mladez.png';
import ocenenia from './images/ocenenia.png';
import podujatia from './images/podujatia.png';
import prieskum from './images/prieskum.png';
import skolenia from './images/skolenia.png';
import srdceNaDlani from './images/srdce na dlani.png';
import strategiaRozvoj from './images/strategia rozvoj.png';
import tyzdenDobrovolnictva from './images/tyzden dobrovolnictva.png';
import vyjazdy from './images/vyjazdy.png';

const createLabel = (id) =>
	id
		.replace(/[-_]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

const illustrations = [
	{ id: 'advokacia', src: advokacia },
	{ id: 'databaza-prepojenie', src: databazaPrepojenie },
	{ id: 'dobrostretko', src: dobrostretko },
	{ id: 'dobroranajky', src: dobroRanajky },
	{ id: 'firemne', src: firemne },
	{ id: 'kampane', src: kampane },
	{ id: 'konzultacie', src: konzultacie },
	{ id: 'mladez', src: mladez },
	{ id: 'ocenenia', src: ocenenia },
	{ id: 'podujatia', src: podujatia },
	{ id: 'prieskum', src: prieskum },
	{ id: 'skolenia', src: skolenia },
	{ id: 'srdce-na-dlani', src: srdceNaDlani },
	{ id: 'strategia-rozvoj', src: strategiaRozvoj },
	{ id: 'tyzden-dobrovolnictva', src: tyzdenDobrovolnictva },
	{ id: 'vyjazdy', src: vyjazdy },
].map((item) => ({
	...item,
	label: createLabel(item.id),
}));

export const getIllustrationById = (id) =>
	illustrations.find((item) => item.id === id) || null;

export default illustrations;
