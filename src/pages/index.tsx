import { useEffect, useState } from 'react';
import { getRandomToolsServerSide } from 'utils/tools';

import Header from '@/components/Header';
import HomePresentation from '@/components/Home/HomePresentation';
import HomeRandomTools from '@/components/Home/HomeRandomTools';
import HomeSearchButton from '@/components/Home/HomeSearchButton';
import HomeSearching from '@/components/Home/HomeSearching';
import HomeSuggestButton from '@/components/Home/HomeSuggestButton';
import Menu from '@/components/Menu';
import type { ToolObjectWithGame } from '@/interfaces/tools';
import { Meta } from '@/layouts/Meta';
import { getDeviceType } from '@/utils/device';
import { getUserFromCookie } from '@/utils/users-helpers';

interface IndexProps {
  tools: ToolObjectWithGame[];
}

interface IndexState {
  searching: boolean;
  menuOpen: boolean;
}

const Index = (props: IndexProps) => {
  const [state, setState] = useState<IndexState>({
    menuOpen: false,
    searching: false,
  });

  const [user, setUser] = useState(null);
  const [mobileType, setMobileType] = useState('desktop');

  useEffect(() => {
    setUser(getUserFromCookie());
    setMobileType(getDeviceType());
  }, []);

  const searchButtonClicked = () => {
    setState({
      ...state,
      searching: true,
    });
  };

  const stopSearching = () => {
    setState({
      ...state,
      searching: false,
    });
  };

  return (
    <div id="home">
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
      {state.menuOpen && <Menu state={state} setState={setState} user={user} />}
      <Header state={state} setState={setState} user={user} />
      <main className="relative">
        {state.searching && <HomeSearching stopSearching={stopSearching} />}
        <div className="px-3">
          <div className="flex justify-between pt-3 xl:flex-col xl:items-end">
            <HomeSearchButton onClick={searchButtonClicked} />
            <HomeSuggestButton />
          </div>
          {mobileType === 'desktop' && (
            <h1 className="text-center xl:mb-24">
              The video games collective toolbox
            </h1>
          )}
          <div className="flex">
            <HomeRandomTools tools={props.tools} />
            {mobileType === 'desktop' && <HomePresentation />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

export async function getServerSideProps() {
  return {
    props: {
      tools: await getRandomToolsServerSide(),
    },
  };
}
