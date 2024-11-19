import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference, UserPreferenceDocument } from './preferences.schema';
import { CreatePreferencesDto } from './dto/create-preferences.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(UserPreference.name) private userPreferenceModel: Model<UserPreferenceDocument>,
  ) {}

  async create(createPreferencesDto: CreatePreferencesDto): Promise<UserPreference> {
    const createdPreference = new this.userPreferenceModel(createPreferencesDto);
    return createdPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    const userPreference = await this.userPreferenceModel.findOne({ userId });
    if (!userPreference) {
      throw new NotFoundException(`Preferences not found for user ID: ${userId}`);
    }
    return userPreference;
  }

  async update(userId: string, updatePreferencesDto: UpdatePreferencesDto): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel.findOneAndUpdate(
      { userId },
      updatePreferencesDto,
      { new: true },
    );
    if (!updatedPreference) {
      throw new NotFoundException(`Preferences not found for user ID: ${userId}`);
    }
    return updatedPreference;
  }

  async remove(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Preferences not found for user ID: ${userId}`);
    }
  }
}
