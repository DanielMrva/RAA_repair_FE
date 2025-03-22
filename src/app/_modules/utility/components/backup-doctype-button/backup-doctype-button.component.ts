import { Component, Input } from '@angular/core';
// import { BackupDocumentService } from '@app/services/utilityServices/backup-document.service';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-backup-doctype-button',
  templateUrl: './backup-doctype-button.component.html',
  styleUrls: ['./backup-doctype-button.component.css']
})
export class BackupDoctypeButtonComponent {

  @Input() documents!: any[];
  @Input() docType!: string;

  constructor(
    // private documentService: BackupDocumentService,
    private toastService: ToastService
  ) {}


  copyDocumentsToClipboard() {
    const text = JSON.stringify(this.documents, null, 2);
    navigator.clipboard.writeText(text)
      .then(() => {
        this.toastService.show(`${this.documents.length} ${this.docType.charAt(0).toUpperCase() + this.docType.slice(1)}s copied to clipboard.`);
      })
      .catch(error => {
        this.toastService.show('Error copying backup data to clipboard.');
        console.error('Clipboard copy failed:', error);
      });
  }

  downloadBackup() {
    try {
      // Convert documents to JSON string with pretty-print formatting.
      const text = JSON.stringify(this.documents, null, 2);
      
      // Create a Blob with the JSON data.
      const blob = new Blob([text], { type: 'application/json' });
      
      // Create a URL for the Blob.
      const url = window.URL.createObjectURL(blob);
      
      // Create an anchor element to trigger the download.
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.docType}-backup.json`;
      
      // Append the anchor to the document body (important for Firefox).
      document.body.appendChild(a);
      
      // Programmatically click the anchor to trigger the download.
      a.click();
      
      // Clean up: remove the anchor and revoke the object URL.
      a.remove();
      window.URL.revokeObjectURL(url);
      
      // Notify the user of the successful download.
      this.toastService.show(`Backup downloaded as ${this.docType}-backup.json`);
    } catch (error: any) {
      // Report error to the user.
      this.toastService.show(`Error downloading backup: ${error.message || error}`);
      // Log the error for debugging.
      console.error('Download backup failed:', error);
    }
  }
  
}
