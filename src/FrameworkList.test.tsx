import { render, screen } from '@testing-library/react';

import { FrameWorkItemType, FrameworkList } from './FrameworkList';

describe('Rendering the list with props', () => {
  it('Should render No data ! when no data proped', () => {
    render(<FrameworkList />);
    expect(screen.getByText('No data !')).toBeInTheDocument();
  });
  it('Should render No data ! when empty data proped', () => {
    render(<FrameworkList frameworks={[]} />);
    expect(screen.getByText('No data !')).toBeInTheDocument();
  });
  it('Should render list item correctry', () => {
    const dummyData: FrameWorkItemType[] = [
      { id: 1, item: 'React Dummy' },
      { id: 2, item: 'Angular Dummy' },
      { id: 3, item: 'Vue Dummy' },
    ];
    render(<FrameworkList frameworks={dummyData} />);
    const frameWorkItems = screen
      .getAllByRole('listitem')
      .map((elm) => elm.textContent);
    const dummyItems = dummyData.map((item) => item.item);
    expect(frameWorkItems).toEqual(dummyItems);
    expect(screen.queryByText('No data !')).not.toBeInTheDocument();
  });
});
