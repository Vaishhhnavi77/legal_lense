import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isUploading?: boolean;
  uploadProgress?: number;
}

const FileUpload = ({ onFileUpload, isUploading = false, uploadProgress = 0 }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type === "application/pdf" || file.type.includes("document")) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card 
        className={`relative p-8 border-2 border-dashed transition-all duration-300 bg-gradient-card ${
          dragActive 
            ? "border-legal-accent bg-legal-accent/5" 
            : "border-border hover:border-legal-accent/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-legal-accent/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-legal-accent" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-legal-text-primary">
              Upload Your Legal Document
            </h3>
            <p className="text-legal-text-secondary">
              Drag and drop your PDF or Word document here, or click to browse
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              variant="legal" 
              onClick={() => inputRef.current?.click()}
              className="px-8"
            >
              Choose File
            </Button>
            
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
              className="hidden"
            />
            
            <p className="text-sm text-legal-text-muted">
              Supports PDF, DOC, DOCX files up to 10MB
            </p>
          </div>
        </div>
      </Card>

      {selectedFile && (
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-legal-accent/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-legal-accent" />
              </div>
              <div>
                <p className="font-medium text-legal-text-primary">{selectedFile.name}</p>
                <p className="text-sm text-legal-text-muted">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-legal-text-muted hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-legal-text-secondary">Uploading...</span>
                <span className="text-legal-text-secondary">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {!isUploading && (
            <div className="mt-4">
              <Button variant="hero" onClick={handleUpload} className="w-full">
                Analyze Document
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default FileUpload;