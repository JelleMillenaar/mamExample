import { MamWriter, MamReader, MAM_MODE, MAM_SECURITY } from 'mam.ts';

const nodeUrl = 'https://nodes.thetangle.org:443';
const seed = 'VXCYBERSECVXCYBERSECVXCYBERSEDDXCYBQRSECQXCYBERSECVXCYBERSECVXCYBERSECVXCYBERSECB'

async function SendData() {
    //Settings
    let mode : MAM_MODE = MAM_MODE.PUBLIC;
    let sideKey : string | undefined = undefined;
    let security : MAM_SECURITY = MAM_SECURITY.LEVEL_1;

    //Create the Writer
    let writer : MamWriter = new MamWriter(nodeUrl, seed, mode, sideKey, security);
    //Store the root of the first MAM transaction
    let rootOfRoots : string = writer.getNextRoot();
    //Set a tag
    writer.setTag("HELLOMALAYSIA");
    //Make sure that we catchup were the stream currently is.
    await writer.catchUpThroughNetwork();
    //Send two messages
    console.log( await writer.createAndAttach("Its a me") );
    console.log( await writer.createAndAttach("MARIO!") );

    //Create a Reader starting at the given root
    let reader : MamReader = new MamReader(nodeUrl, rootOfRoots, mode, sideKey);
    //Find the messages
    let messages : string[] = await reader.fetch();
    console.log(messages);
}

SendData();