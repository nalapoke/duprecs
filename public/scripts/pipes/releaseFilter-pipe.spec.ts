import { ReleaseFilterPipe } from './releaseFilter-pipe';
import { IArtist } from '../models/artist';
import { IBasicInformation } from '../models/basicInformation';
import { IRelease } from '../models/release';

describe('ReleaseFilterPipe', () => {
  let pipe: ReleaseFilterPipe;
  let exNunsRelease: IRelease = <IRelease>{
    basic_information: <IBasicInformation> {
      artists: <IArtist[]>[<IArtist>{ name: 'Ex Nuns' }],
      title: 'Dead Of Zero'
    }
  };
  let laarksRelease: IRelease = <IRelease>{
    basic_information: <IBasicInformation> {
      artists: <IArtist[]>[<IArtist>{ name: 'Laarks' }],
      title: 'An Exaltation Of Laarks'
    }
  };
  let theNationalRelease: IRelease = <IRelease>{
    basic_information: <IBasicInformation> {
      artists: <IArtist[]>[<IArtist>{ name: 'The National' }],
      title: 'High Violet'
    }
  };
  let allReleases: IRelease[] = <IRelease[]>[
    exNunsRelease,
    laarksRelease,
    theNationalRelease
  ];

  beforeEach(() => {
    pipe = new ReleaseFilterPipe();
  });

  it('returns original release array if no arugment is passed', () => {
    expect(pipe.transform(allReleases, [])).toEqual(allReleases);
  });

  it('correctly filters when artist matches are found', () => {
    expect(pipe.transform(allReleases, ['nat'])).toEqual([theNationalRelease]);
    expect(pipe.transform(allReleases, ['uNs'])).toEqual([exNunsRelease]);
    expect(pipe.transform(allReleases, ['the'])).toEqual([theNationalRelease]);
  });

  it('correctly filters when title matches are found', () => {
    expect(pipe.transform(allReleases, ['zero'])).toEqual([exNunsRelease]);
    expect(pipe.transform(allReleases, ['Violet'])).toEqual([theNationalRelease]);
    expect(pipe.transform(allReleases, ['exalt'])).toEqual([laarksRelease]);
  });

  it('correctly filters when artist and title matches are found', () => {
    expect(pipe.transform(allReleases, ['laar'])).toEqual([laarksRelease]);
    expect(pipe.transform(allReleases, ['ex'])).toEqual([exNunsRelease, laarksRelease]);
  });

  it('correctly filters when no matches are found', () => {
    expect(pipe.transform(allReleases, ['nonexistent'])).toEqual([]);
  });

  it('correctly filters regardless of casing', () => {
    expect(pipe.transform(allReleases, ['Laarks'])).toEqual([laarksRelease]);
    expect(pipe.transform(allReleases, ['laarkS'])).toEqual([laarksRelease]);
    expect(pipe.transform(allReleases, ['LAARKS'])).toEqual([laarksRelease]);
    expect(pipe.transform(allReleases, ['laaRks'])).toEqual([laarksRelease]);
  });
});
