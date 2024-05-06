import AppProject from '../components/project';
import AppAbout from '../components/about';
import AppServices from '../components/services';

export default function Home() {
    return(
        <main>
          <AppProject/>
          <AppAbout/>
          <AppServices/>
        </main>
    );
}