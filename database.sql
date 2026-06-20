-- Master Data
CREATE TABLE opd (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), nama_opd TEXT NOT NULL, kode_opd TEXT UNIQUE NOT NULL);
CREATE TABLE profiles (id UUID REFERENCES auth.users(id) PRIMARY KEY, opd_id UUID REFERENCES opd(id), role TEXT CHECK (role IN ('super_admin', 'admin_opd', 'operator', 'verifikator', 'viewer')), nama_lengkap TEXT);

-- Kinerja & Transaksi
CREATE TABLE sasaran_kinerja (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), opd_id UUID REFERENCES opd(id), parent_id UUID REFERENCES sasaran_kinerja(id), nama_sasaran TEXT NOT NULL, tahun INT NOT NULL, updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE indikator_kinerja (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), sasaran_id UUID REFERENCES sasaran_kinerja(id), nama_indikator TEXT NOT NULL, target_tahunan DECIMAL(10,2));
CREATE TABLE penilaian_kinerja (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), indikator_id UUID REFERENCES indikator_kinerja(id), opd_id UUID REFERENCES opd(id), realisasi DECIMAL(10,2), status_verifikasi TEXT DEFAULT 'draft' CHECK (status_verifikasi IN ('draft', 'submitted', 'verified')), catatan_apip TEXT, updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE bukti_dukung (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), penilaian_id UUID REFERENCES penilaian_kinerja(id), file_url TEXT NOT NULL, diunggah_pada TIMESTAMP DEFAULT NOW());

-- Trigger Audit
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ language 'plpgsql';
CREATE TRIGGER trg_update_penilaian BEFORE UPDATE ON penilaian_kinerja FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();