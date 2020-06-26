import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from '../tags/tags.service';
import { TagRepository } from '../tags/repositories/tags.repository';
import { NotFoundException } from '@nestjs/common';

const mockTagRepository = () => ({
  find: jest.fn(),
  findById: jest.fn(),
  save: jest.fn().mockResolvedValue(mockTag),
  findOrCreateTags: jest.fn().mockResolvedValue(mockFindOrCreatedTags),
});

const mockTag = {
  id: 1,
  name: 'Action',
  isActive: true,
};
const mockCreateTagDto = {
  name: 'Action',
};
const mockDeletedTag = {
  id: 1,
  name: 'Action',
  isActive: false,
};

const mockTags = ['Space', 'Action'];

const mockFindOrCreatedTags = [
  {
    id: 1,
    name: 'Action',
    isActive: true,
  },
  {
    id: 2,
    name: 'Space',
    isActive: true,
  },
];
describe('TagsService', () => {
  let tagsService: TagsService;
  let tagRepository: TagRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, { provide: TagRepository, useFactory: mockTagRepository }],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
    tagRepository = module.get<TagRepository>(TagRepository);
  });
  it('Should be defined', () => {
    expect(tagsService).toBeDefined();
    expect(tagRepository).toBeDefined();
  });

  describe('Get Tags', () => {
    it('Get all tags', async () => {
      (tagRepository.find as jest.Mock).mockResolvedValue('Returns all tags');
      expect(tagRepository.find).not.toHaveBeenCalled();
      const result = await tagsService.getTags();
      expect(tagRepository.find).toHaveBeenCalled();
      expect(result).toEqual('Returns all tags');
    });
  });

  describe('Get Tag', () => {
    it('Get a tag with id 1', async () => {
      (tagRepository.findById as jest.Mock).mockResolvedValue(mockTag);
      expect(tagRepository.findById).not.toHaveBeenCalled();
      const result = await tagsService.getTag(1);
      expect(result).toEqual(mockTag);
      expect(tagRepository.findById).toHaveBeenCalledWith(1);
    });
    it('Throws an error when the tag does not exist', async () => {
      (tagRepository.findById as jest.Mock).mockResolvedValue(null);
      expect(tagsService.getTag(0)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Create Tag', () => {
    it('Create a new tag', async () => {
      const result = await tagsService.createTag(mockCreateTagDto);
      expect(result).toEqual(mockTag);
    });
  });

  describe('Remove Tag', () => {
    it('Remove a tag', async () => {
      (tagRepository.findById as jest.Mock).mockResolvedValue(mockTag);
      expect(tagRepository.findById).not.toHaveBeenCalled();
      const result = await tagsService.removeTag(1);
      expect(tagRepository.findById).toHaveBeenCalled();
      expect(result).toEqual(mockDeletedTag);
    });
  });

  describe('FindOrCreateTags', () => {
    it('Find or create tags', async () => {
      const result = await tagsService.findOrCreateTags(mockTags);
      expect(result).toEqual(mockFindOrCreatedTags);
    });
  });
});
