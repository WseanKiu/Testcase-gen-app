# Stubs Directory

This directory contains sample user story data for testing the ExeQT tool.

## Purpose

These JSON files simulate Rally API responses for development and testing purposes.

## Files

- `us1235_response.json` - Sample login functionality user story
- `us1239_response.json` - Sample search functionality user story

## Usage

When you run:
```bash
yarn exeqt us1235
```

The system will look for `stubs/us1235_response.json` to get the user story data.

## Adding New Stub Data

To add a new user story for testing:

1. Create a new JSON file following the naming pattern: `{user_story_id}_response.json`
2. Follow the same structure as existing files
3. Run: `yarn exeqt {user_story_id}`

## Future Integration

When Rally integration is implemented, this stub system will be replaced with real API calls to fetch user story data.
