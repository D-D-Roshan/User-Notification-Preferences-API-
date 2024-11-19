import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/create-preferences.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Controller('api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  // Create a new user preference
  @Post()
  create(@Body() createPreferencesDto: CreatePreferencesDto) {
    return this.preferencesService.create(createPreferencesDto);
  }

  // Get user preferences by userId
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.preferencesService.findOne(userId);
  }

  // Update user preferences by userId
  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updatePreferencesDto: UpdatePreferencesDto,
  ) {
    // Call the service to update the preferences for the user
    return await this.preferencesService.update(userId, updatePreferencesDto);
  }

  // Delete user preferences by userId
  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    // Call the service to remove the user preferences
    return await this.preferencesService.remove(userId);
  }
}
