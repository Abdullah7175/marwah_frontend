#!/usr/bin/env python3
"""
Image Optimization Script for Marwah Travels
This script optimizes images to reduce file sizes and improve performance.
"""

import os
import sys
from PIL import Image
import argparse
from pathlib import Path

def optimize_image(input_path, output_path, quality=85, max_width=None, max_height=None):
    """Optimize a single image file."""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Resize if dimensions are specified
            if max_width or max_height:
                img.thumbnail((max_width or img.width, max_height or img.height), Image.Resampling.LANCZOS)
            
            # Save optimized image
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            savings = original_size - optimized_size
            
            print(f"✓ {input_path.name}: {original_size/1024:.1f}KB → {optimized_size/1024:.1f}KB (Saved {savings/1024:.1f}KB)")
            
            return savings
            
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return 0

def optimize_directory(input_dir, output_dir, quality=85, max_width=None, max_height=None):
    """Optimize all images in a directory."""
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    if not input_path.exists():
        print(f"Error: Input directory {input_dir} does not exist")
        return
    
    # Create output directory if it doesn't exist
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Supported image formats
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff'}
    
    total_savings = 0
    processed_count = 0
    
    print(f"Optimizing images in {input_dir}...")
    print(f"Output directory: {output_dir}")
    print(f"Quality: {quality}%, Max dimensions: {max_width}x{max_height}")
    print("-" * 50)
    
    for file_path in input_path.rglob('*'):
        if file_path.suffix.lower() in image_extensions:
            # Create relative output path
            relative_path = file_path.relative_to(input_path)
            output_file = output_path / relative_path
            
            # Create output subdirectories if needed
            output_file.parent.mkdir(parents=True, exist_ok=True)
            
            # Optimize image
            savings = optimize_image(file_path, output_file, quality, max_width, max_height)
            total_savings += savings
            processed_count += 1
    
    print("-" * 50)
    print(f"Processed {processed_count} images")
    print(f"Total space saved: {total_savings/1024/1024:.2f}MB")

def main():
    parser = argparse.ArgumentParser(description='Optimize images for web performance')
    parser.add_argument('input_dir', help='Input directory containing images')
    parser.add_argument('output_dir', help='Output directory for optimized images')
    parser.add_argument('--quality', type=int, default=85, help='JPEG quality (1-100, default: 85)')
    parser.add_argument('--max-width', type=int, help='Maximum width for images')
    parser.add_argument('--max-height', type=int, help='Maximum height for images')
    
    args = parser.parse_args()
    
    # Validate quality
    if not 1 <= args.quality <= 100:
        print("Error: Quality must be between 1 and 100")
        sys.exit(1)
    
    # Validate directories
    if not os.path.exists(args.input_dir):
        print(f"Error: Input directory '{args.input_dir}' does not exist")
        sys.exit(1)
    
    try:
        optimize_directory(
            args.input_dir, 
            args.output_dir, 
            args.quality, 
            args.max_width, 
            args.max_height
        )
    except KeyboardInterrupt:
        print("\nOperation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
