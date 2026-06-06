import { useState, useEffect } from 'react';
import { useCMSContent, useUpdateCMSContent } from '../../hooks/useCMS';
import { FiSave, FiLayout } from 'react-icons/fi';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import toast from 'react-hot-toast';

const AdminCMS = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  const { data: heroContent, isLoading: heroLoading } = useCMSContent('hero');
  const { data: aboutContent, isLoading: aboutLoading } = useCMSContent('about');
  const updateContent = useUpdateCMSContent();

  const [heroData, setHeroData] = useState({ title: '', subtitle: '', button_text: '', button_link: '', secondary_button_text: '', secondary_button_link: '' });
  const [aboutData, setAboutData] = useState({ title: '', subtitle: '', mission: '', vision: '' });

  useEffect(() => {
    if (heroContent) {
      setHeroData({
        title: heroContent.title || '',
        subtitle: heroContent.subtitle || '',
        button_text: heroContent.content?.button_text || '',
        button_link: heroContent.content?.button_link || '',
        secondary_button_text: heroContent.content?.secondary_button_text || '',
        secondary_button_link: heroContent.content?.secondary_button_link || ''
      });
    }
  }, [heroContent]);

  useEffect(() => {
    if (aboutContent) {
      setAboutData({
        title: aboutContent.title || '',
        subtitle: aboutContent.subtitle || '',
        mission: aboutContent.content?.mission || '',
        vision: aboutContent.content?.vision || ''
      });
    }
  }, [aboutContent]);

  const handleHeroSave = async () => {
    try {
      await updateContent.mutateAsync({
        section: 'hero',
        data: {
          title: heroData.title,
          subtitle: heroData.subtitle,
          content: {
            button_text: heroData.button_text,
            button_link: heroData.button_link,
            secondary_button_text: heroData.secondary_button_text,
            secondary_button_link: heroData.secondary_button_link
          }
        }
      });
      toast.success('Hero section updated');
    } catch (error) {
      // handled by hook
    }
  };

  const handleAboutSave = async () => {
    try {
      await updateContent.mutateAsync({
        section: 'about',
        data: {
          title: aboutData.title,
          subtitle: aboutData.subtitle,
          content: {
            mission: aboutData.mission,
            vision: aboutData.vision
          }
        }
      });
      toast.success('About section updated');
    } catch (error) {
      // handled by hook
    }
  };

  const sections = [
    { id: 'hero', name: 'Homepage Hero' },
    { id: 'about', name: 'About Us Page' }
  ];

  if (heroLoading || aboutLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">Content Management</h1>
        <p className="text-gray-600">Update the text and content across your website.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 text-navy-900 font-semibold">
              <FiLayout /> Sections
            </div>
            <nav className="p-2 space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id 
                      ? 'bg-cream-100 text-crimson-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeSection === 'hero' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-navy-900">Homepage Hero Section</h2>
                <p className="text-gray-500 text-sm">This is the first thing visitors see on your homepage.</p>
              </div>
              <div className="p-6 space-y-6">
                <Input
                  label="Main Headline"
                  value={heroData.title}
                  onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                  placeholder="e.g. Find Your Dream Home in Ilocos"
                />
                <Textarea
                  label="Subheadline"
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                  rows={3}
                />
                
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Primary Button</h3>
                    <Input
                      label="Button Text"
                      value={heroData.button_text}
                      onChange={(e) => setHeroData({...heroData, button_text: e.target.value})}
                    />
                    <Input
                      label="Button Link"
                      value={heroData.button_link}
                      onChange={(e) => setHeroData({...heroData, button_link: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Secondary Button</h3>
                    <Input
                      label="Button Text"
                      value={heroData.secondary_button_text}
                      onChange={(e) => setHeroData({...heroData, secondary_button_text: e.target.value})}
                    />
                    <Input
                      label="Button Link"
                      value={heroData.secondary_button_link}
                      onChange={(e) => setHeroData({...heroData, secondary_button_link: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <Button onClick={handleHeroSave} isLoading={updateContent.isPending} leftIcon={<FiSave />}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-navy-900">About Us Content</h2>
                <p className="text-gray-500 text-sm">Manage the text on the About page.</p>
              </div>
              <div className="p-6 space-y-6">
                <Input
                  label="About Headline"
                  value={aboutData.title}
                  onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                />
                <Textarea
                  label="Company Story / Introduction"
                  value={aboutData.subtitle}
                  onChange={(e) => setAboutData({...aboutData, subtitle: e.target.value})}
                  rows={4}
                />
                
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <Textarea
                    label="Our Mission"
                    value={aboutData.mission}
                    onChange={(e) => setAboutData({...aboutData, mission: e.target.value})}
                    rows={4}
                  />
                  <Textarea
                    label="Our Vision"
                    value={aboutData.vision}
                    onChange={(e) => setAboutData({...aboutData, vision: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <Button onClick={handleAboutSave} isLoading={updateContent.isPending} leftIcon={<FiSave />}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminCMS;
