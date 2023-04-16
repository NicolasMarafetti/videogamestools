import { useEffect, useState } from 'react';
import { getRandomToolsServerSide } from 'utils/tools';

import Header from '@/components/Header';
import HomeRandomTools from '@/components/Home/HomeRandomTools';
import HomeSearchButton from '@/components/Home/HomeSearchButton';
import HomeSearching from '@/components/Home/HomeSearching';
import HomeSuggestButton from '@/components/Home/HomeSuggestButton';
import Menu from '@/components/Menu';
import type { ToolObjectWithGame } from '@/interfaces/tools';
import { getDeviceType } from '@/utils/device';

interface IndexProps {
  tools: ToolObjectWithGame[];
}

const Index = (props: IndexProps) => {
  const [searching, setSearching] = useState<boolean>(false);

  const [mobileType, setMobileType] = useState('desktop');

  useEffect(() => {
    setMobileType(getDeviceType());
  }, []);

  const searchButtonClicked = () => {
    setSearching(true);
  };

  const stopSearching = () => {
    setSearching(false);
  };

  return (
    <div className="min-h-screen bg-[#0e1927]" id="home">
      <Header user={null} />
      <Menu />
      <main>
        {searching && <HomeSearching stopSearching={stopSearching} />}
        <div className="px-3">
          <div className="flex justify-between pt-3 xl:flex-col xl:items-end">
            <HomeSearchButton onClick={searchButtonClicked} />
            <HomeSuggestButton />
          </div>
          {mobileType === 'desktop' && (
            <h1 className="text-center text-white xl:mb-24">
              The video games collective toolbox
            </h1>
          )}
          <HomeRandomTools tools={props.tools} />
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
