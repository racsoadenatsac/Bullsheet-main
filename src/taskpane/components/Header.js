import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, nextPage, reset } from '../store/fileSlice';
import { PrimaryButton } from "office-ui-fabric-react";

export default function Header() {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  const onClickNextPage = () => {
    dispatch(nextPage());
  };

  const onClickReset = () => {
    dispatch(reset());
  };

  return (
    <div className="header">
      <img src="https://static.wixstatic.com/media/cba6d1_f9885eb856454c498e7e555ecc6b1ae7~mv2.png" alt="Sparksheet Inc."></img>
      <div className="debug">
        <PrimaryButton onClick={onClickNextPage}>Next ({page})</PrimaryButton>
        <PrimaryButton onClick={onClickReset}>Reset</PrimaryButton>
      </div>
    </div>
  );
}