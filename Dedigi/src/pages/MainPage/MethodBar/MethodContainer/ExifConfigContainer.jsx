/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ExifHeader from '../../../../utils/methods/ExifHeader';
import ConfigContainer from '../../ConfigContainer';
import colors from '../../../../constants/colors';

const ExifScrollView = styled.div`
  background: ${colors.white};
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  padding: 15px;

  word-break: break-all;
  color: ${colors.black};
`;

const ExifInfo = styled.div`
  margin-bottom: 5px;
`;

const nonAcceptableInfo = ['UserComment', 'JPEGInterchangeFormat'];

export default function ExifConfigContainer() {
  const [metaData, setMetadata] = useState(null);
  const imageReducer = useSelector((state) => state.imageReducer);

  useEffect(async () => {
    const res = await ExifHeader();
    if (res.exifData || res.gpsInfo || res.thumbnailData || Object.keys(res.tiffData).length !== 0) {
      setMetadata(res);
    }
  }, [imageReducer.src]);

  function getMetaData() {
    const results = [];
    if (metaData) {
      Object.keys(metaData).forEach((dataOne) => {
        const metaDataOne = metaData[dataOne];
        if (metaDataOne) {
          Object.keys(metaDataOne).forEach((dataTwo) => {
            if (!nonAcceptableInfo.includes(dataTwo)) {
              results.push({ title: dataTwo, info: metaDataOne[dataTwo] });
            }
          });
        }
      });
    }
    if (results.length > 0)
      return results.map((result) => {
        return (
          <ExifInfo key={`metadata-${result.title}`}>
            <span style={{ fontStyle: 'italic' }}>- {result.title}</span>
            <span> : </span>
            <span>{result.info}</span>
          </ExifInfo>
        );
      });
    return <p>No metadata was found</p>;
  }

  return (
    <div>
      <ConfigContainer title="metadata">
        <ExifScrollView>{getMetaData()}</ExifScrollView>
      </ConfigContainer>
    </div>
  );
}
