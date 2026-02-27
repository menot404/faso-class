import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, LayoutDashboard, Users, GraduationCap, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  const suggestions = [
    { to: '/', label: t('Tableau de bord'), icon: LayoutDashboard },
    { to: '/students', label: t('Étudiants'), icon: Users },
    { to: '/classes', label: t('Classes'), icon: GraduationCap },
    { to: '/grades', label: t('Notes'), icon: BookOpen },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-secondary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 shadow-xl overflow-hidden">
          <CardContent className="p-8 text-center">
            {/* Illustration 404 animée */}
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mb-6"
            >
              <div className="text-9xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                404
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4"
            >
              {t('Page non trouvée')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8 max-w-md mx-auto"
            >
              {t('Désolé, la page que vous cherchez n\'existe pas ou a été déplacée.')}
            </motion.p>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Button asChild size="lg" className="gap-2">
                <Link to="/">
                  <Home className="h-5 w-5" />
                  {t('Retour à l\'accueil')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/">
                  <LayoutDashboard className="h-5 w-5" />
                  {t('Tableau de bord')}
                </Link>
              </Button>
            </motion.div>

            {/* Suggestions de navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground mb-3">
                {t('Ou explorez directement :')}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {suggestions.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Button variant="ghost" size="sm" asChild className="gap-2">
                      <Link to={item.to}>
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Petit texte humoristique optionnel */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          © {new Date().getFullYear()} FasoClass Pro – {t('Perdu ? Pas de panique, on vous guide.')}
        </motion.p>
      </motion.div>
    </div>
  )
}