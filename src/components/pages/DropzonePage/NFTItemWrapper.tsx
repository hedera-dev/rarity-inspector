/*-
 *
 * Hedera Rarity Inspector
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { NFTItem } from '@/components/pages/DropzonePage/NFTItem';
import { useCallback, useState } from 'react';
import { NFTDetails } from '@/components/pages/NFTDetailsDialog/NFTDetails';
import { MetadataObject, ValidateArrayOfObjectsResult } from 'hedera-nft-utilities';
import { MetadataRow } from '@/utils/types/metadataRow';
import { calculateTraitOccurrenceFromData } from 'hedera-nft-utilities/src/rarity/index';

export const NFTItemWrapper = ({
  singleMetadataObject,
  index,
  metadataRows,
  validationResponse,
}: {
  singleMetadataObject: MetadataObject;
  index: number;
  metadataRows: MetadataRow[];
  validationResponse: ValidateArrayOfObjectsResult;
}) => {
  const [activeId, setActiveId] = useState(index);
  const handlePrevious = useCallback(() => setActiveId((oldId) => Math.max(oldId - 1, 0)), []);
  const handleNext = useCallback(() => setActiveId((oldId) => Math.min(oldId + 1, metadataRows.length - 1)), [metadataRows.length]);
  const validationResult = validationResponse?.results[index];
  const metadataList: MetadataObject[] = metadataRows.map((row) => row.metadata);
  const traitOccurrence = calculateTraitOccurrenceFromData(metadataList);

  return (
    <NFTItem key={index} metadata={singleMetadataObject} validationResult={validationResult} index={index}>
      <NFTDetails
        metadataObject={metadataRows[activeId].metadata}
        rarity={metadataRows[activeId].rarity}
        fileName={metadataRows[activeId].fileName}
        metadataLength={metadataRows.length}
        metadataRows={metadataRows}
        activeId={activeId}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        validationResponse={validationResponse}
        traitOccurrence={traitOccurrence}
      />
    </NFTItem>
  );
};
