import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../../../../../components';
import { Card } from '../../../../../../components/Card';
import { EIESteps } from '../../../../../../enums';
import { Map } from './Map';

export const IEStartLocation = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section');

  useEffect(() => {
    const containerField = document.getElementById(section as string);

    containerField?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [section]);

  return (
    <div className="w-full h-[600px] space-y-4">
      <Card id={EIESteps.START_LOCATION} title="Start location" isSelected={section === EIESteps.START_LOCATION}>
        <Map />
      </Card>
      <Card
        id={EIESteps.CONTAINER_INFORMATION}
        title="Container information"
        isSelected={section === EIESteps.CONTAINER_INFORMATION}
      >
        <div></div>
      </Card>
      <Card id={EIESteps.END_LOCATION} title="End location" isSelected={section === EIESteps.END_LOCATION}>
        <Map />
      </Card>
      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">Lưu thông tin</Button>
      </div>
    </div>
  );
};
