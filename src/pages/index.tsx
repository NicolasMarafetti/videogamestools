import { useState } from 'react';

import HomePresentation from '@/components/Home/HomePresentation';
import HomeRandomTools from '@/components/Home/HomeRandomTools';
import HomeSearchButton from '@/components/Home/HomeSearchButton';
import HomeSearching from '@/components/Home/HomeSearching';
import HomeSuggestButton from '@/components/Home/HomeSuggestButton';
import { Meta } from '@/layouts/Meta';
import { getDeviceType } from '@/utils/device';

interface IndexState {
  searching: boolean;
}

const Index = () => {
  const [state, setState] = useState<IndexState>({
    searching: false,
  });

  const mobileType = getDeviceType();

  const searchButtonClicked = () => {
    setState({
      searching: true,
    });
  };

  const stopSearching = () => {
    setState({
      searching: false,
    });
  };

  return (
    <div id="home">
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
      <main>
        {state.searching && <HomeSearching stopSearching={stopSearching} />}
        <div>
          <div>
            <HomeSearchButton onClick={searchButtonClicked} />
            <HomeSuggestButton />
          </div>
          {mobileType === 'desktop' && (
            <h1>The video games collective toolbox</h1>
          )}
          <div>
            <HomeRandomTools />
            {mobileType === 'desktop' && <HomePresentation />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
