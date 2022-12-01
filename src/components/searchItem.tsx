const SearchItem = ({
  data,
  clickItem,
  setData,
}: {
  data: any;
  clickItem: any;
  setData: any;
}) => {
  return (
    <div
      onClick={() => {
        clickItem(data.name);
        setData(null);
      }}
      style={{ cursor: 'pointer' }}
    >
      <div>{data.name}</div>
    </div>
  );
};

export default SearchItem;
