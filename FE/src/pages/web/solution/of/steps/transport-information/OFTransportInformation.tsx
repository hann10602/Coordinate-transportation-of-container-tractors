import { createContext, useState } from 'react';
import { OFConfirmInformationMenu, OFFillInformationMenu } from '../../../../../../constants';
import { Sidebar } from '../../../../../../layout/request-layout/Sidebar';
import { Completed } from '../../../components/completed/Completed';
import { ETRANSPORT_INFORMATION_STEPS } from '../../enums';
import { OFConfirmInformation } from './confirm-information/ConfirmInformation';
import { OFFillInformation } from './fill-information/FillInformation';

type TStepContext = {
  setStep: React.Dispatch<React.SetStateAction<ETRANSPORT_INFORMATION_STEPS>>;
};

const OF_STEP_INFORMATION = [
  {
    step: ETRANSPORT_INFORMATION_STEPS.FILL_LOCATION,
    menu: OFFillInformationMenu,
    component: <OFFillInformation />
  },
  {
    step: ETRANSPORT_INFORMATION_STEPS.CONFIRM_LOCATION,
    menu: OFConfirmInformationMenu,
    component: <OFConfirmInformation />
  },
  {
    step: ETRANSPORT_INFORMATION_STEPS.COMPLETED,
    component: <Completed />
  }
];

export const StepContext = createContext<TStepContext>({ setStep: () => {} });

export const OFTransportInformation = () => {
  const [step, setStep] = useState<ETRANSPORT_INFORMATION_STEPS>(ETRANSPORT_INFORMATION_STEPS.FILL_LOCATION);
  return (
    <StepContext.Provider value={{ setStep }}>
      {OF_STEP_INFORMATION.map((item) =>
        item.step === step ? (
          <div className="w-full flex flex-1 h-full" key={item.step}>
            {item.menu && <Sidebar menu={item.menu} />}
            <div className="flex-1 px-8 py-16 h-full overflow-y-scroll">
              <div className="w-full h-[600px] space-y-4">{item.component}</div>
            </div>
          </div>
        ) : (
          <></>
        )
      )}
    </StepContext.Provider>
  );
};
