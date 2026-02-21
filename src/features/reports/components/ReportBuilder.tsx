import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useTemplates, useGenerateReport } from '../hooks/useReports'
import type { ReportFormat } from '../types'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'

interface ReportBuilderProps {
  open: boolean
  onClose: () => void
}

export function ReportBuilder({ open, onClose }: ReportBuilderProps) {
  const { t } = useTranslation()
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>('pdf')
  const { data: templates, isLoading } = useTemplates()
  const generateMutation = useGenerateReport()

  const handleGenerate = () => {
    if (!selectedTemplate) return
    generateMutation.mutate(
      { templateId: selectedTemplate, format: selectedFormat },
      {
        onSuccess: () => {
          onClose()
          setSelectedTemplate('')
          setSelectedFormat('pdf')
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{t('Nouveau rapport')}</DialogTitle>
          <DialogDescription>
            {t('Choisissez un modèle et un format de fichier.')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="template">{t('Modèle')}</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template">
                <SelectValue placeholder={t('Sélectionner un modèle')} />
              </SelectTrigger>
              <SelectContent>
                {templates?.map((tpl) => (
                  <SelectItem key={tpl.id} value={tpl.id}>
                    {tpl.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="format">{t('Format')}</Label>
            <Select value={selectedFormat} onValueChange={(v) => setSelectedFormat(v as ReportFormat)}>
              <SelectTrigger id="format">
                <SelectValue placeholder={t('Format')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('Annuler')}
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!selectedTemplate || generateMutation.isPending}
          >
            {generateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('Générer')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}